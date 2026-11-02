
cost = int(input("Enter the cost : "))
discout =0

if cost >=75:
    discout = cost *0.3
    price = cost - discout
    print(f"You have bought with more than 75$ you have gotten a discout of  {discout:.2f} $ ")
    print(f"Your final cost to pay is {price:.2f} $")
else:
    print("You are not eligible for the discount.")