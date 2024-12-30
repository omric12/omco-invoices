package pkg

import (
    "log"
)

// Log logs a message with the provided severity level.
func Log(level string, message string) {
    log.Printf("[%s] %s", level, message)
}

// HandleError handles an error by logging it and returning a user-friendly message.
func HandleError(err error) string {
    if err != nil {
        Log("ERROR", err.Error())
        return "An error occurred, please try again."
    }
    return ""
}