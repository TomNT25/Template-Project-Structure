namespace Template.Helper.Constant
{
    public static class MessageConstants
    {
        public static class Auth
        {
            public const string LoginSuccess = "Auth.LoginSuccess";
            public const string RegisterSuccess = "Auth.RegisterSuccess";
            public const string LogoutSuccess = "Auth.LogoutSuccess";
            public const string SendOtpSuccess = "Auth.SendOtpSuccess";
            public const string VerifyOtpSuccess = "Auth.VerifyOtpSuccess";
            public const string ForgotPasswordSuccess = "Auth.ForgotPasswordSuccess";
            public const string ResetPasswordSuccess = "Auth.ResetPasswordSuccess";
            public const string GetMeSuccess = "Auth.GetMeSuccess";
            
            public const string InvalidCredentials = "Auth.InvalidCredentials";
            public const string EmailRegistered = "Auth.EmailRegistered";
            public const string UsernameTaken = "Auth.UsernameTaken";
            public const string DefaultRoleNotFound = "Auth.DefaultRoleNotFound";
            public const string InvalidOrExpiredOtp = "Auth.InvalidOrExpiredOtp";
            public const string UserNotFound = "Auth.UserNotFound";
            public const string IdentityNotFound = "Auth.IdentityNotFound";
        }

        public static class Student
        {
            public const string GetAllSuccess = "Student.GetAllSuccess";
            public const string GetByIdSuccess = "Student.GetByIdSuccess";
            public const string AddSuccess = "Student.AddSuccess";
            public const string UpdateSuccess = "Student.UpdateSuccess";
            public const string DeleteSuccess = "Student.DeleteSuccess";
        }

        public static class System
        {
            public const string ValidationFailed = "System.ValidationFailed";
            public const string UnexpectedError = "System.UnexpectedError";
            public const string ResourceNotFound = "System.ResourceNotFound";
            public const string UnauthorizedAccess = "System.UnauthorizedAccess";
        }
    }
}
