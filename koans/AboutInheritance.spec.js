describe("About Higher Order Functions", function () {

  it("should use filter to return array items that meet a criteria", function () {
    var numbers = [1,2,3];
    var odd = numbers.filter(function (x) { return x % 2 !== 0 });

    expect(odd).toEqual([1,3]);
    expect(odd.length).toBe(2);
    expect(numbers.length).toBe(3);
  });

  it("should use 'map' to transform each element", function () {
    var numbers = [1, 2, 3];
    var numbersPlus1 = numbers.map(function(x) { return x + 1 });

    expect(numbersPlus1).toEqual([2, 3, 4]);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it("should use 'reduce' to update the same result on each iteration", function () {
    var numbers = [1, 2, 3];
    var reduction = numbers.reduce(
            function(/* result from last call */ memo, /* current */ x) { return memo + x }, /* initial */ 0);

    expect(reduction).toBe(6);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it("should use 'forEach' for simple iteration", function () {
    var numbers = [1,2,3];
    var msg = "";
    var isEven = function (item) {
      msg += (item % 2) === 0;
    };

    numbers.forEach(isEven);

    expect(msg).toEqual('falsetruefalse');
    expect(numbers).toEqual([1, 2, 3]);
  });

  function flattenArray(arr) {
    return arr.reduce(function(prev, curr) {
      if (Array.isArray(curr)) {
        return [...prev, ...curr];
      }

      return [...prev, curr];
    }, []);
  }

  it("should use flatten to make nested arrays easy to work with", function() {
      expect(flattenArray([ [1, 2], [3, 4] , 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("should chain multiple higher order functions", function() {
      var result = flattenArray([ [0, 1], [2, 3] ])
        .filter(function(x) { return x % 2 === 0 })
        .map(function(x) { return x + 1 } )
        .reduce(function (sum, x) { return sum + x });

      expect(result).toEqual(4);
  });

});
