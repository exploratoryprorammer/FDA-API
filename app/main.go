package main

import (
	"fmt"
)

func main() {
	var first int
	fmt.Println("Enter your first number")
	fmt.Scanln(&first)
	var second int
	fmt.Println("Enter your second rumber")
	fmt.Scanln(&second)
	fmt.Println(add(first, second))
}

func add(x int, y int) int {
	return x + y
}
