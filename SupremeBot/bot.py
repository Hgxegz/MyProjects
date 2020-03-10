from config import keys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import requests
import time


def order(k, prodLink):
    global driver
    driver = webdriver.Chrome()
    driver.get(prodLink)
    time.sleep(5)
    driver.find_element_by_xpath('//*[@id="add-remove-buttons"]/input').click()
    time.sleep(3)
    driver.find_element_by_xpath('//*[@id="cart"]/a[2]').click()
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="order_billing_name"]').send_keys(k["name"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="order_email"]').send_keys(k["email"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="order_tel"]').send_keys(k["telephone"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="bo"]').send_keys(k["address"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="oba3"]').send_keys(k["apartment"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="order_billing_zip"]').send_keys(k["zip_code"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="order_billing_city"]').send_keys(k["city"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="rnsnckrn"]').send_keys(k["card_Number"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="credit_card_month"]').send_keys(k["exp_month"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="credit_card_year"]').send_keys(k["exp_year"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="orcer"]').send_keys(k["civ"])
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="cart-cc"]/fieldset/p[2]/label/div/ins').click()
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="pay"]/input').click()


def itemContents(LinkToItem, itemName, itemColor): #passes in the link from the users choice to look for items
    supremeSiteLink = requests.get(LinkToItem)
    soup = BeautifulSoup(supremeSiteLink.content, 'html.parser')
    #created the object
    #now we need to look for specific class for item we want
    for item in soup.find_all('div' , class_= "inner-article"):
        productName = item.find('div', class_= "product-name")
        productColor = item.find('div', class_ = "product-style")
        if(itemName == productName.a.text and itemColor == productColor.a.text):
            print(productName.a.text + " in " + productColor.a.text)
            styleLink = productColor.find('a').get('href')
            return ("https://www.supremenewyork.com" + styleLink)
    print("No items found for the criteria")

def itemsAvailableAndLink():
    supremeSite = requests.get('https://www.supremenewyork.com/shop/all')
    soup = BeautifulSoup(supremeSite.content, 'html.parser')
    for cat in soup.find_all('ul' , {'id': 'nav-categories'}):
        count = 0
        count2 = 0
        for litag in cat.find_all('li'):
            print(str(count) + ": " + litag.text)
            count += 1
        catNum = input("Enter the catergory number: ")
        for desired in cat.find_all('li'):
            if(catNum == str(count2)):
                extension = (desired.find('a').get('href'))
                fullLink = ("https://www.supremenewyork.com" + extension)
                return fullLink
            count2 += 1





if __name__ == '__main__':
    print("Items available:")
    link = itemsAvailableAndLink() #gets the link to the item page from function
    desiredItem = input("Enter item name: ")
    color = input("Enter item color: ")
    final = (itemContents(link, desiredItem, color))
    print(final)
    order(keys, final)
