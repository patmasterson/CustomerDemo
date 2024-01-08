using CustomerDemo.Models;
using System.Text.Json;

namespace CustomerDemo.Data
{
    public static class DataSeeder
    {
        public static void InitCustomers(CustomerContext context)
        {
            var customerData = File.ReadAllText("Data/InitialCustomerData.json");
            var customers = JsonSerializer.Deserialize<List<Customer>>(customerData);
            if (customers != null)
            {
                foreach (var cust in customers)
                {
                    context.Customers.Add(cust);
                }

                context.SaveChanges();
            }
        }
    }
}
