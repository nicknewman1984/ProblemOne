var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function mutateArray(a) {
  let arr2 = [];

  const flatten = (ob) => {
    let result = {};
    for (const i in ob) {
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) { //check for object to flatten
            const temp = flatten(ob[i]);

            for (let j in temp) { //changed from const to let to allow key to be changed
              if(j == "some_array") {
                let arr3 = temp[j];
                j = "some_total";
                result[j] = arr3.reduce((a, b) => a + b, 0); //add up values of the array
              } else {
                result[j] = temp[j];
            }   
          }
        }
        else {
            result[i] = ob[i];
        }
    }
    return result;
  };

  // iterate through array
  for (const i in a) {
    if(a[i].guest_type == "guest") {
      arr2.push(flatten(a[i]));
    }
  }

  // sort alphabetically by last name and then first name
  arr2.sort((a, b)=> {
    if (a.last_name === b.last_name){
      return a.first_name < b.first_name ? -1 : 1
    } else {
      return a.last_name < b.last_name ? -1 : 1
    }
  })
  
  return arr2;
}

$(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
