---
id: "bash-scripting-basics"
title: "Bash Scripting Basics"
date: "2024-01-04"
category: "Security"
tags: ["Bash", "Linux", "Security", "Automation", "Scripting"]
readTime: "6 min read"
author: "Santhos Suntharalingam"
featured: true
excerpt: "Learn the fundamentals of Bash scripting for automation and system administration. This comprehensive guide covers variables, loops, functions, and more."
---

# Introduction

Why Bash? Do you know that you can automate your most of the daily tasks by using Bash scripting! Sequence of commands can be automated and perform repeatedly. Bash is a Unix shell and command language written by Brian Fox and first released in 1989.

## Creating Bash Files

`.sh` extension is used to create Bash files. We can create Bash files manually or using touch or nano commands in Linux system.

```bash
root@host:~$ nano my_bash_file.sh
```

The above command will create a bash file name called "my_bash_file" with the extension ".sh".

## Simple Hello World Script

In the Linux terminal whatever commands we execute to do any task can be recorded into a Bash file and all the recorded tasks can be executed by using a single command in the Terminal.

When we create Bash files, we often define the file belongs to Bash file by defining shebang `#!/bin/bash` at the first line of the file.

Let's create hello_world.sh file:

```bash
root@host:~$ nano hello_world.sh
```

Write a command to print "Hello World!":

```bash
#!/bin/bash

echo "Hello World!"
```

We can execute the above script after saving the file using "bash" command:

```bash
root@host:~$ bash hello_world.sh
```

If we make the file executable then we can execute the script by using "./" and your file name as postfix. To make the file as executable, we should set permission to execute the program. To set permissions for a file, we can use "chmod" command:

```bash
root@host:~$ chmod +x hello_world.sh
```

The above command sets executable permission to the specified file. "chmod" is used to change the permissions and "+x" adds the execute permission. If you need to remove the permission then use "-x". "+" for adding permission and "-" for removing permission of a file.

Now we can execute our bash script file by putting "./" at the start of the file name:

```bash
root@host:~$ ./hello_world.sh
```

Above both commands will execute our script file to perform the specified tasks.

## Passing Arguments to a Script

While performing some certain tasks, our script often need some arguments from the user input. Therefore, arguments can be passed to a script while its execution and passed values can be captured by using "$" sign with the arguments passed order.

```bash
#!/bin/bash

echo $1 $2
```

Above statement's `$1` represents the first argument and `$2` represents the second argument to be passed.

```bash
root@host:~$ ./hello_world.sh "Hello" "World"
```

If we see the above command line, `$1` represents "Hello" and `$2` represents "World" and the program output will be "Hello World".


## Variables

Variables are not strictly typed in Bash means if we provide a value to a variable then bash will understand and interpret the corresponding data type of that value. Just use meaningful names when you define and initialize variables. Variable can contain letters, underscores and numbers but it cannot start with a number and it is case sensitive.

```bash
#!/bin/bash

firstName="Santhos"
lastName="Sunthar"
age=24
```

Make sure that you do not include spaces between the variable name and specified value otherwise you will end up with "command not found error".

```bash
#!/bin/bash

firstName = "Santhos"  # Wrong
firstName="Santhos"    # Correct
```

When we access the variable in any place within the file, we should use "$" sign to access the variable's specified value.

```bash
#!/bin/bash

firstName="Santhos"

echo $firstName  # Output >>> Santhos
```

### Variable Scope

#### Global Scope

Global variable is defined and accessible throughout the entire script. It can be accessed from the function and also outside of the function.

```bash
#!/bin/bash

variable="I am global and I can be accessed from anywhere!"

function testVariable() {
  echo "Accessed from the function: $variable"
}

testVariable
echo "Accessed from outside of the function: $variable"
```

#### Local Scope

Variable which is defined within a function using "local" keyword and it is only accessible within the function. It will not affect the global variable which contains same name as the local variable.

```bash
#!/bin/bash

variable="I am global and I can be accessed from anywhere!"

function testVariable() {
  local variable="I am local and I am only accessible within the function!"
  echo "Accessed from the function: $variable"
}

testVariable
echo "Accessed from outside of the function: $variable"
```

If you do not define the local variable within the function using "local" keyword then the variable will be treated as a global variable and the value of the variable will be modified.


## String Concatenation

We can concatenate multiple strings to produce a new string.

```bash
#!/bin/bash

firstName="Santhos"
lastName="Sunthar"
age=24

fullName="$firstName $lastName"  

echo $fullName  # Output >>> Santhos Sunthar
```

## Arithmetic Operators

Arithmetic operators are useful when performing addition, subtraction, multiplication, division and etc.

- `(+)` - Addition
- `(-)` - Subtraction
- `(*)` - Multiplication
- `(/)` - Division
- `(%)` - Modulus (To get the reminder of division)
- `(**)` - Exponentiation
- `(++)` - Increment
- `(--)` - Decrement
- `(=)` - Assignment

Arithmetic operations should be performed within double open and close parenthesizes.

```bash
#!/bin/bash

number=5

square=$(($number ** 2))
echo $square  # Output >>> 25
```

When writing expressions be aware that we cannot use spaces between the variable name and the equal sign.

```bash
#!/bash

sum = $((100 + 200))  # Wrong
sum=$((100 + 200))    # Correct
```

When you have a string that contains a variable name, "let" keyword can be used to access the specific variable's value by using the variable name.

```bash
#!/bin/bash

let "sum = 100 + 200"
echo $sum  # Output >>> 300
```

You can see that the above command "sum = 100 + 200" does not contain parenthesizes and it can contain spaces between the variable name and specified values.



## Conditional Operators

Conditional operators are useful when we need to make decisions. We can achieve this by using if, elif and else statements.

Before moving into the statements we should know the comparison operators which are used to compare values in bash to make decisions.

### Comparison Operators

- `-gt`: Greater than
- `-ge`: Greater than or equal
- `-lt`: Less than
- `-le`: Less than or equal
- `-eq`: Equal
- `-ne`: Not equal

### if Statement

```bash
#!/bin/bash

if [ $age -ge 21 ]; then
  echo "You are eligible!"
fi
```

Did you see the "fi" keyword at the end of the if statement. "fi" is used to terminate the if statement which is the reversed form of "if" keyword.

### if and else Statements

```bash
#!/bin/bash

if [ $age -ge 21 ]; then
  echo "You are eligible!"
else
  echo "You are not eligible!"
fi 
```

### if and elif Statements

```bash
#!/bin/bash

if [ $marks -ge 75 ]; then
  echo "You are doing well!"
elif [ $marks -ge 50 ]; then
  echo "You can improve than this!"
else
  echo "Poor performance!"
fi
```



## Iterators

Iterations can be performed using loops such as while loop, for loop and until loop.

### for Loop

When we know how many times the task should be iterated.

```bash
#!/bin/bash

for ((initialization; condition; increment)); do
  # Some Code
done
```

**For an example:**

```bash
for ((number=1; number<=5; number++)); do
  echo $number
done
```

### while Loop

Iterations happen till the certain condition is true.

```bash
#!/bin/bash

while [ condition ]; do
  # Some Code
done
```

**For an example:**

```bash
processId=10
while [ $processId -ge 1 ]; do
    echo "Process $processId is running!"
    ((processId--))
done

echo "Processes executed successfully!"
```

### until Loop

Iterations happen till the certain condition is false.

```bash
#!/bin/bash

until [ condition ]; do
    # Some Code
done
```

**For an example:**

```bash
processId=1
until [ $processId -ge 10 ]; do
    echo "Loading..."
    ((processId++))
    sleep 1
done

echo "Loaded successfully!"
```

You can see the "sleep" keyword in the until loop statement which is used to make the iteration delay by one second.



## Functions

Functions are useful when you need to reuse some piece of code. Once define and call multiple time purposes!

### Function Definition and Call

We can define the function using "function" keyword with the function name and can write codes within curly braces. Function can be called by using its name.

```bash
#!/bin/bash

function print() {
    echo "Program loaded successfully!"
}

print  # Output >>> Program loaded successfully!
```

### Parameters and Arguments

Arguments can be passed as sequences of values with spaces and the passes values can be captured within the function using "$" sign with the number order that refers the argument values passed order.

```bash
#!/bin/bash

function print() {
    echo "$1 $2"
}

print "Hello" "World"  # Output >>> Hello World
```

Note that when we use "echo" command within a function, it returns the value as a function output.

If we want to capture the return value of the function, we should use parenthesizes.

```bash
#!/bin/bash

function print() {
    echo "$1 $2"
}

functionOutput=$(print "Hello" "World")
echo $functionOutput  # Output >>> Hello World
```

## Conclusion

That's all in this reading and I hope this article will be helpful to accomplish your automation tasks! Thank you for putting your eyesight and six minutes on this article. I'll see you again with my future post! 😊