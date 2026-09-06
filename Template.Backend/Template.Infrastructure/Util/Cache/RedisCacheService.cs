using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Template.Domain.Contract.Cache;

namespace Template.Infrastructure.Util.Cache
{
    public class RedisCacheService : ICacheService
    {
        private readonly IDistributedCache? _distributedCache;
        private readonly IMemoryCache _memoryCache;
        private readonly ILogger<RedisCacheService> _logger;
        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public RedisCacheService(
            IMemoryCache memoryCache,
            ILogger<RedisCacheService> logger,
            IDistributedCache? distributedCache = null)
        {
            _memoryCache = memoryCache;
            _logger = logger;
            _distributedCache = distributedCache;
        }

        public async Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(key))
                return default;

            var cacheKey = FormatKey(key);

            if (_distributedCache != null)
            {
                try
                {
                    var data = await _distributedCache.GetStringAsync(cacheKey, cancellationToken);
                    if (!string.IsNullOrEmpty(data))
                    {
                        return JsonSerializer.Deserialize<T>(data, JsonOptions);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Redis GET failed for key '{CacheKey}'. Falling back to IMemoryCache.", cacheKey);
                }
            }

            if (_memoryCache.TryGetValue(cacheKey, out T? value))
            {
                return value;
            }

            return default;
        }

        public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(key) || value == null)
                return;

            var cacheKey = FormatKey(key);
            var expiry = expiration ?? TimeSpan.FromMinutes(15);

            if (_distributedCache != null)
            {
                try
                {
                    var serializedData = JsonSerializer.Serialize(value, JsonOptions);
                    var options = new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = expiry
                    };
                    await _distributedCache.SetStringAsync(cacheKey, serializedData, options, cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Redis SET failed for key '{CacheKey}'. Falling back to IMemoryCache.", cacheKey);
                }
            }

            _memoryCache.Set(cacheKey, value, expiry);
        }

        public async Task RemoveAsync(string key, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(key))
                return;

            var cacheKey = FormatKey(key);

            if (_distributedCache != null)
            {
                try
                {
                    await _distributedCache.RemoveAsync(cacheKey, cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Redis REMOVE failed for key '{CacheKey}'. Falling back to IMemoryCache.", cacheKey);
                }
            }

            _memoryCache.Remove(cacheKey);
        }

        public async Task<bool> ExistsAsync(string key, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(key))
                return false;

            var result = await GetStringAsync(key, cancellationToken);
            return result != null;
        }

        public async Task<string?> GetStringAsync(string key, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(key))
                return null;

            var cacheKey = FormatKey(key);

            if (_distributedCache != null)
            {
                try
                {
                    var data = await _distributedCache.GetStringAsync(cacheKey, cancellationToken);
                    if (data != null)
                        return data;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Redis GetString failed for key '{CacheKey}'. Falling back to IMemoryCache.", cacheKey);
                }
            }

            if (_memoryCache.TryGetValue(cacheKey, out string? value))
            {
                return value;
            }

            return null;
        }

        public async Task SetStringAsync(string key, string value, TimeSpan? expiration = null, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(key))
                return;

            var cacheKey = FormatKey(key);
            var expiry = expiration ?? TimeSpan.FromMinutes(15);

            if (_distributedCache != null)
            {
                try
                {
                    var options = new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = expiry
                    };
                    await _distributedCache.SetStringAsync(cacheKey, value, options, cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Redis SetString failed for key '{CacheKey}'. Falling back to IMemoryCache.", cacheKey);
                }
            }

            _memoryCache.Set(cacheKey, value, expiry);
        }

        private static string FormatKey(string key) => key.Trim();
    }
}
