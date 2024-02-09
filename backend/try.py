class Solution:
    def distance(self, nums: List[int]) -> List[int]:
        # create prefix sum
        prefix = defaultdict(tuple)
        prefixSum = [0]*len(nums)
        for i, e in enumerate(nums):
            if e in prefix:
                # get the last index, value and the previous count
                ind, val,  count= prefix[e]
                dis = i - ind
                newVal = dis
                dis *= (count-1)
                newVal += dis + val
                prefix[e] = (i, newVal, count+1)
            else:
                prefix[e] = (i, 0, 1)
            prefixSum[i] = prefix[e][1]

        print(prefixSum)

        suffix = defaultdict(tuple)
        suffixSum = [0]*len(nums)

        for i in range(len(nums)-1,-1,-1):
            e = nums[i]
            if e in suffix:
                ind, val, count = suffix[e]
                dis = ind - i
                newVal = dis
                dis *= (count-1)
                newVal += dis + val
                suffix[e] = (i, newVal, count+1)
            else:
                suffix[e] = (i, 0, 1)
            suffixSum[i] = suffix[e][1]

        print(suffixSum)
        # the answer is the sum of prefix and suffix
        ans = [0] * len(nums)
        for i in range(len(nums)):
            ans[i] = prefixSum[i] + suffixSum[i]
            
        return ans
        