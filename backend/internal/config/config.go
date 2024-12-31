package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Config struct {
	DBConnString string
	JWTSecret    string
	Port         string
	DB           *gorm.DB
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	config := &Config{
		DBConnString: os.Getenv("DATABASE_URL"),
		JWTSecret:    os.Getenv("JWT_SECRET"),
		Port:         os.Getenv("PORT"),
	}

	if err := config.InitDB(); err != nil {
		return nil, err
	}

	return config, nil
}

func (c *Config) InitDB() error {
	if c.DBConnString == "" {
		return fmt.Errorf("database connection string is empty")
	}

	db, err := gorm.Open(postgres.Open(c.DBConnString), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to initialize database: %w", err)
	}

	// Test connection
	sqlDB, err := db.DB()
	if err != nil {
		return fmt.Errorf("failed to get database instance: %w", err)
	}

	if err := sqlDB.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	c.DB = db
	return nil
}
