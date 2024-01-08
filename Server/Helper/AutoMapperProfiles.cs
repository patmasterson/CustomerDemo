using AutoMapper;
using CustomerDemo.DTOs;
using CustomerDemo.Models;

namespace CustomerDemo.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<Customer, CustomerDto>().ReverseMap();
        }
    }
}
