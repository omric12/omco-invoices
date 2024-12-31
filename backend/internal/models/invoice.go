package models

import (
	"sync"
	"time"

	"gorm.io/gorm"
)

type Invoice struct {
	Base
	UserID        string               `json:"user_id"`
	CompanyID     *string              `json:"company_id"`
	Number        int                  `json:"number"` // Changed from *int to int
	Name          string               `json:"name"`
	Amount        float64              `json:"amount"`
	Date          time.Time            `json:"date"`
	PaymentMethod InvoicePaymentMethod `json:"payment_method"`
	Description   *string              `json:"description"`
	ItemsQuantity *int                 `json:"items_quantity"`
	CustomerName  string               `json:"customer_name"`
	CustomerPhone *string              `json:"customer_phone"`
	CustomerAddr  *string              `json:"customer_address"`
	CustomerEmail *string              `json:"customer_email"`
}
type InvoicePaymentMethod string

const (
	PaymentMethodCash   InvoicePaymentMethod = "CASH"
	PaymentMethodBit    InvoicePaymentMethod = "BIT"
	PaymentMethodPaybox InvoicePaymentMethod = "PAYBOX"
)

// UserInvoiceCounter tracks the last invoice number per user
type UserInvoiceCounter struct {
	Base
	UserID     string     `json:"user_id" gorm:"uniqueIndex"`
	LastNumber int        `json:"last_number"`
	mutex      sync.Mutex `gorm:"-"`
}

// GetNextInvoiceNumber returns and saves the next available number
func (c *UserInvoiceCounter) GetNextInvoiceNumber(db *gorm.DB) (int, error) {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	c.LastNumber++
	if err := db.Save(c).Error; err != nil {
		return 0, err
	}
	return c.LastNumber, nil
}
