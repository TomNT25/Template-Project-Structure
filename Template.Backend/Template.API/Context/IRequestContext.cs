namespace Template.API.Context
{
    public interface IRequestContext
    {
        string RequestId { get; }
        DateTime Timestamp { get; }
    }
}
