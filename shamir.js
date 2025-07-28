// Shamir's Secret Sharing - Find the constant term of polynomial

// Test Case 1
const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

// Test Case 2
const testCase2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

// Function to convert from any base to decimal
function baseToDecimal(value, base) {
    return BigInt(parseInt(value, base));
}

// Function to decode Y values from different bases
function decodePoints(testCase) {
    const points = [];
    const k = testCase.keys.k;
    
    // Get the first k points (we only need k points to solve)
    let count = 0;
    for (let key in testCase) {
        if (key !== "keys" && count < k) {
            const x = BigInt(key);
            const base = parseInt(testCase[key].base);
            const encodedValue = testCase[key].value;
            const y = baseToDecimal(encodedValue, base);
            points.push({ x, y });
            count++;
        }
    }
    
    return points;
}

// Lagrange Interpolation to find polynomial value at x=0 (constant term)
function lagrangeInterpolation(points) {
    const k = points.length;
    let result = 0n; // Using BigInt for large numbers
    
    // Calculate f(0) using Lagrange interpolation
    for (let i = 0; i < k; i++) {
        let numerator = 1n;
        let denominator = 1n;
        
        // Calculate the Lagrange basis polynomial Li(0)
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                numerator *= (0n - points[j].x);
                denominator *= (points[i].x - points[j].x);
            }
        }
        
        // Add yi * Li(0) to result
        result += points[i].y * numerator / denominator;
    }
    
    return result;
}

// Function to solve for secret (constant term)
function findSecret(testCase) {
    console.log(`\nProcessing test case with n=${testCase.keys.n}, k=${testCase.keys.k}`);
    
    // Step 1: Decode the points
    const points = decodePoints(testCase);
    
    console.log("Decoded points:");
    points.forEach((point, index) => {
        console.log(`Point ${index + 1}: (${point.x}, ${point.y})`);
    });
    
    // Step 2: Use Lagrange interpolation to find constant term
    const secret = lagrangeInterpolation(points);
    
    return secret;
}

// Main execution
console.log("=== Shamir's Secret Sharing Solution ===");

console.log("\n--- Test Case 1 ---");
const secret1 = findSecret(testCase1);
console.log(`Secret (constant term): ${secret1}`);

console.log("\n--- Test Case 2 ---");
const secret2 = findSecret(testCase2);
console.log(`Secret (constant term): ${secret2}`);

console.log("\n=== Final Results ===");
console.log(`Test Case 1 Secret: ${secret1}`);
console.log(`Test Case 2 Secret: ${secret2}`);
