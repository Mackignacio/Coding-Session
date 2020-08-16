const items = [{
        name: "bob",
        age: 25,
        address: "abc",
        city: "texas"
    },
    {
        name: "john",
        age: 30,
        address: "sfd"
    },
    {
        name: "mark",
        age: 18,
        address: "hfgj"
    },

    {
        name: "wer",
        age: 22,
        address: "qwe"
    }, {
        name: "steven",
        age: 27,
        address: "rty"
    },
];

// const list = [
//     [1],
//     2,
//     [3],
//     [4],
//     5
// ]

// const ages = [];

// for (let index = 0; index < list.length; index++) {
//     if (Array.isArray(list[index])) {
//         ages.push(list[index][0]);
//     } else {
//         ages.push(list[index]);
//     }
// }

// const ages = list
//     .flatMap(item => item)
// /* .map(({
//     name,
//     age
// }) => {
//     return {
//         name,
//         age
//     }
// }) */
// ;

// const ages = items
//     .map(({
//         name,
//         age
//     }) => {
//         return {
//             name,
//             age
//         }
//     });

// items.forEach(item => console.log(item.value));

// const newArray = [];

// for (let index = 0; index < items.length; index++) {
//     newArray.push({
//         [items[index].value]: index
//     });
// }

/* const newArray = items.map((item, index) => ({
    [item.value]: index
})); */

/* let ages = 0;

for (let index = 0; index < items.length; index++) {
    ages += items[index].age;
} */

/* const ages = items
    .map(item => item.age)
    .reduce((acc, cur) => acc + cur); */

/* const list = [];

for (let index = 0; index < items.length; index++) {
    if (items[index].age <= 30) {
        list.push(items[index]);
    }
}

let ages = 0;

for (let index = 0; index < list.length; index++) {
    ages += list[index].age;
}
 */

// const ages = items
//     .filter(item => item.age <= 30)
//     .map(item => item.age)
//     .reduce((acc, cur) => acc + cur);



// console.log(ages);


// RECURSION

// let counter = 0;
// const max = 10;

// // for (let index = 0; index < max; index++) {
// //     counter++
// //     console.log(counter);
// // }

// // Array(10).fill(undefined).map((item, index) => console.log(index + 1))

// const recusrive = (value, counter) => {
//     if (counter <= value) {
//         console.log(counter++);
//         recusrive(value, counter);
//     }
// }

// recusrive(max, counter);

// DATA
const airports = 'PH US HK CHN JPN'.split(' ');

const routes = [
    ["PH", "HK"],
    ["HK", "JPN"],
    ["JPN", "US"],
    ["US", "PH"],
    ["HK", "US"],
    ["HK", "CHN"],
];

// Create MAP
const adjMap = new Map();

// Create node
function addNode(airport) {
    adjMap.set(airport, []);
}

// Create edge connection
function addEdge(from, to) {
    adjMap.get(from).push(to);
    adjMap.get(to).push(from);
}

airports.forEach(addNode);
routes.forEach(route => addEdge(...route));

const bfs = (start, end) => {

    const visited = new Set();

    const queue = [start];

    while (queue.length > 0) {
        const airport = queue.shift();
        const destinations = adjMap.get(airport);

        console.log(airport);
        for (const destination of destinations) {

            if (destination === end) {
                console.log("FOUND", end);
                return;
            }

            if (!visited.has(destination)) {
                visited.add(destination);
                queue.push(destination);
            }

        }
    }
}

bfs("US", "CHN");

console.log("==========================");

const dfs = (start, end, visited = new Set()) => {

    console.log(start)

    visited.add(start);

    const destinations = adjMap.get(start);

    for (const destination of destinations) {

        if (destination === end) {
            console.log("FOUND", end);
            return;
        }

        if (!visited.has(destination)) {
            dfs(destination, end, visited);
        }
    }
}

dfs("US", "CHN");