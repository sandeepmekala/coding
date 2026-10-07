import java.util.HashMap;

public class PrefixSum_L560_SubarraySumEqualsK {
    public static void main(String[] args) {
        PrefixSum_L560_SubarraySumEqualsK obj = new PrefixSum_L560_SubarraySumEqualsK();
        System.out.println(obj.subarraySum(new int[] { 1, 2, 3 }, 3));
    }

    // Problem: https://leetcode.com/problems/subarray-sum-equals-k/
    // Idea: Use a map to store prefix sum.
    // You can get current subarray of sum k by subtracting current prefixsums with
    // old prefixsum if one exist.
    // Since there can be multiple sub arrays with prefix sum x-k, we need to track
    // frequencies also.
    // Time: O(n), Space: O(n)
    public int subarraySum(int[] nums, int k) {
        var map = new HashMap<Integer, Integer>(); // sum -> count
        map.put(0, 1); // one subarray with sum 0

        int sum = 0, cnt = 0;
        for (int num : nums) {
            sum += num;
            int rem = sum - k;
            if (map.containsKey(rem)) {
                cnt += map.get(rem);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }

        return cnt;
    }
}
