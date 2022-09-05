/**
 * Write any test
 */

 test('First test block' , () =>{
    // Write the logic to be tested
    console.log("Hello Students");
});


function add(a,b){
   return a+b;
}

test("Testing the output of add ", ()=>{
   //Exepectation , actuals
   expect(add(3,4)).toBe(7);
});


test("testing two objects,", ()=>{
   const obj = {
       name : "Vishal",
       age : 99
   }
   
   expect(obj).toEqual({
       name : "Vishal",
       age : 99
   })

})

test("testing null", () =>{
   let n = null;
   let a = undefined ;
   let b = 7;

   expect(n).toBeNull();
   expect(a).toBeUndefined();
   expect(b).toBeDefined();

   /**
    * toBeGreaterThan
    * toBeGreaterThanOrEqual
    * toBeLessThan
    * toBeLessThanOrEqual
    */
})




const person = {
   name : 'Vishal',
   age : 99,
   address : {
       lane1 : "radhanagri",
       lane2 : "Suncity Apartment",
       city : "pune",
       zip : 430032
   }
}