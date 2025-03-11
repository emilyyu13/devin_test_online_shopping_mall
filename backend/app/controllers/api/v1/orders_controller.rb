class Api::V1::OrdersController < ApplicationController
  def index
    if params[:user_id]
      orders = Order.includes(order_items: :product).where(user_id: params[:user_id])
    else
      orders = Order.includes(order_items: :product).all
    end
    render json: orders, include: { order_items: { include: :product } }
  end

  def show
    order = Order.includes(order_items: :product).find(params[:id])
    render json: order, include: { order_items: { include: :product } }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end

  def create
    ActiveRecord::Base.transaction do
      order = Order.new(
        user_id: params[:user_id],
        status: 'pending',
        total: calculate_total(params[:order_items])
      )
      
      if order.save
        create_order_items(order, params[:order_items])
        render json: order, status: :created, include: { order_items: { include: :product } }
      else
        render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def update
    order = Order.find(params[:id])
    
    if order.update(order_params)
      render json: order, include: { order_items: { include: :product } }
    else
      render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end
  
  private
  
  def order_params
    params.require(:order).permit(:status)
  end
  
  def calculate_total(order_items)
    total = 0
    
    order_items.each do |item|
      product = Product.find(item[:product_id])
      total += product.price * item[:quantity]
    end
    
    total
  end
  
  def create_order_items(order, order_items_params)
    order_items_params.each do |item_params|
      product = Product.find(item_params[:product_id])
      
      # Check if there's enough stock
      if product.stock < item_params[:quantity]
        raise ActiveRecord::Rollback, "Not enough stock for #{product.name}"
      end
      
      # Create order item
      order.order_items.create!(
        product: product,
        quantity: item_params[:quantity],
        price: product.price
      )
      
      # Update product stock
      product.update!(stock: product.stock - item_params[:quantity])
    end
  end
end
