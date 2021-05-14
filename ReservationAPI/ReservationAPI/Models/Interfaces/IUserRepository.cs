using Microsoft.AspNetCore.Mvc;
using ReservationAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetAll();
        Task<bool> ConfirmEmail(LoginModel model);
        Task SendEmail(string email);
        Task<object> Get(string email);
        Task<object> Update(int id, UserModel userModel);
        Task<List<UserModel>> GetAllFriends(String email, User loggedUser);
        Task<object> AddFriend(AddFriendModel newFriends);
        Task<object> RemoveFriend(AddFriendModel unFriends);
    }
}
