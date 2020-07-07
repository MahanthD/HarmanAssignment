package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

func GetLocation(Location string) {
	endpoint, _ := url.Parse("https://geocode.search.hereapi.com/v1/geocode")
	queryPrams := endpoint.Query()
	queryPrams.Set("app_id", "ZPL3Ttgx9217ClPuUJI2")
	queryPrams.Set("api_key", "AZsKSsFSkxvQ458PJ5x08cq6dAnZIDfDX1b-pu59u8M")
	queryPrams.Set("q", Location)
	endpoint.RawQuery = queryPrams.Encode()
	response, err := http.Get(endpoint.String())
	if err != nil {
		fmt.Println("The Http Request failed with Error %s\n", err)
	} else {

		data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
	}
}

func main() {
	var Location string
	var poi string
	fmt.Println("Starting the application")
	fmt.Println("Enter the Location")
	fmt.Scanln(&Location)
	fmt.Println("Enter the required POI's")
	fmt.Scanln(&poi)
	GetLocation(Location)

}
