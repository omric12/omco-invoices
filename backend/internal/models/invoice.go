package models

import (
	"time"
)

type Invoice struct {
	Base
	UserID        string    `json:"user_id"`
	Name          string    `json:"name"`
	Number        *int      `json:"number"`
	Amount        float64   `json:"amount"`
	PaymentMethod string    `json:"payment_method"`
	Description   *string   `json:"description"`
	ItemsQuantity *int      `json:"items_quantity"`
	CustomerName  string    `json:"customer_name"`
	CustomerPhone *string   `json:"customer_phone"`
	CustomerAddr  *string   `json:"customer_address"`
	CustomerEmail *string   `json:"customer_email"`
	Date          time.Time `json:"date"`
}
