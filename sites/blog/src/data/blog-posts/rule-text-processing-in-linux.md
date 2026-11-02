---
title: "Rule Text Processing in Linux using Grep, Sed, and Awk"
date: "2024-11-19"
category: "Linux"
tags: ["Linux", "Command Line", "Text Processing", "Grep", "Sed", "Awk"]
readTime: "6 min read"
author: "Santhos Suntharalingam"
featured: true
excerpt: "Master the essential Linux text processing utilities - grep, sed, and awk. Learn how to search, filter, and transform text data efficiently with practical examples and real-world use cases."
---

# Rule Text Processing in Linux using Grep, Sed, and Awk

Are you a Linux user? Not a lover? 🫣 Are you fully exploring the power of your Linux system? At the end of this article you'll be!

Therefore, it's inevitable to learn some important utilities we often use for text processing in Linux such as "grep", "sed" and "awk". This article will introduce these tools, highlight their key use cases, and provide practical examples to solve common Linux text processing challenges.

Let's jump into the segment without wasting time…

## Grep

The name "grep" stands for Global Regular Expression Print, and it's a command line utility in Linux and it's a powerful tool also. Grep stands out as one of the most versatile and essential tool for any Linux user specially if you're gonna perform data searching and extraction from different data types. It's an old Unix utility and released nearly 50 years ago since 2024. You don't need to install this tool. It's pre-installed in Linux. It allows searching for matches to certain text patterns (regular expressions) in files.

```bash
# Get help
grep -h
```

Grep is used for a wide range of text processing tasks, including:

- Searching for specific text patterns in files
- Filtering outputs of other commands
- Extracting useful information from log files
- Analyzing large datasets

### Basic Syntax:
```bash
grep [options] pattern [file_name]
```

If file name is not provided then "grep" will take standard input from the shell environment.

### Use Cases

Mainly it can be used for searching plain text data for lines that match a regular expression.

Note that Grep tool is case sensitive.

Let's try the below command…

```bash
echo "Hello World!" | grep "World"
```

**Output:**
```
Hello World!
```

In the above command, grep takes standard input and processing it to match for the "World" text and it prints the entire line of text. Therefore, need to look at the default behavior of the Grep command, it searches for the pattern match throughout the inputted text and if it finds a match then it prints the entire line that contains the word we're searching for.

Let's try for a text file that contains following data.

**File Name: myfile.txt**

```plain-text
File Name: myfile.txt
Created At: August 5, 2024
Updated At: August 9, 2024
Secure: True
```

```bash
cat myfile.txt | grep "Name"
```

**Output:**
```plain-text
File Name: myfile.txt
```

**Also we can run like the below if we're in the input file directory:**
```bash
grep "Name" myfile.txt
```

**Or need to provide an absolute path of the input file:**
```bash
grep "Name" /home/santhos/Desktop/myfile.txt
```

Now you know that Grep tool finds the specified text in the input stream and prints the entire line if there's a match.

Now, let's update the "myfile.txt" file and try to get the same text we tried to get before.

**File Name: myfile.txt**

```plain-text
File Name: myfile.txt
Created At: August 5, 2024
Updated At: August 9, 2024
Secure: True

Author Name: Santhos Sunthar
Function name: UtilityTest
```

So, now we could see the output like below…

```bash
cat myfile.txt | grep "Name"
```

**Output:**
```plain-text
File Name: myfile.txt
Author Name: Santhos Sunthar
```

Therefore, now you could get an idea about the basic function of this tool and the output pattern.

Let's do something differently!

```bash
cat myfile.txt | grep -i "Name"
```

**Output:**
```plain-text
File Name: myfile.txt
Author Name: Santhos Sunthar
Function name: UtilityTest
```

Have you noticed the difference between the previous command and the last one? We've added "-i" attribute to tell grep to perform case insensitive search right. Therefore, we could get results for "Name" and "name" keywords.

How can we get line numbers of the word we search in the specified txt file? We need to add an another attribute "-n" to get line numbers.

```bash
cat myfile.txt | grep -i -n "Name"
```

**Output:**
```plain-text
3:File Name: myfile.txt
9:Author Name: Santhos Sunthar
10:Function name: UtilityTest
```

## Sed

"sed" stands for "Stream Editor." It's used for parsing and transforming text in a data stream or a file using a simple and compact programming language.

### Use Cases
- Substitute text in a file
- Remove lines or text patterns
- Insert text at specific locations

```bash
# Get help
sed -h
```

It's a powerful and handy tool to substitute text.

```bash
echo "Hello World!" | sed s/World/Folks/
```

**Output:**
```plain-text
Hello Folks!
```

What will happen for the below command execution?

```bash
echo "Hello World! Ah, add another World..." | sed s/World/Folks/
```

**Output:**
```plain-text
Hello Folks! Ah, add another World
```

As you could see, only the first value of "World" was being substituted but not the second one. Therefore, if we need to substitute all the occurrences of the input data then we have to execute the command like below…

```bash
echo "Hello World! Ah, add another World..." | sed s/World/Folks/g
```

**Output:**
```plain-text
Hello Folks! Ah, add another Folks
```

We can substitute text in our myfile.txt too!

```bash
sed s/name/Name/g myfile.txt
```

**Output:**
```plain-text
# myfile.txt

File Name: myfile.txt
Created At: August 5, 2024
Updated At: August 9, 2024
Secure: True

Author Name: Santhos Sunthar
Function Name: UtilityTest
```

How can we remove the first line that starts with "#" from our myfile.txt?

```bash
sed /^#/d myfile.txt
```

**Output:**
```plain-text
File Name: myfile.txt
Created At: August 5, 2024
Updated At: August 9, 2024
Secure: True

Author Name: Santhos Sunthar
Function name: UtilityTest
```

In the above command execution, all the comments that contains "#" were removed in the "myfile.txt".

Let's insert a new line in the second line of myfile.txt…

```bash
sed '2i\# Configuration File' myfile.txt
```

**Output:**
```plain-text
# myfile.txt
# Configuration File
File Name: myfile.txt
Created At: August 5, 2024
Updated At: August 9, 2024
Secure: True

Author Name: Santhos Sunthar
Function name: UtilityTest
```

Also, we can remove blank lines from the myfile.txt.

```bash
sed /^$/d myfile.txt
```

**Output:**
```plain-text
# myfile.txt
File Name: myfile.txt
Created At: August 5, 2024
Updated At: August 9, 2024
Secure: True
Author Name: Santhos Sunthar
Function name: UtilityTest
```

Now If we have multiple files, So how can we substitute text in those all files at once? Let's try this command…

```bash
sed s/anything/special/g *.txt
```

## Awk

"awk" is a powerful programming language designed for text processing, and It is typically used as a data extraction and reporting tool.

### Use Cases
- Select specific fields from structured text files
- Perform complex text transformations
- Summarize data from files

Let's print the first column of myfile.txt.

```bash
awk '{print $1}' myfile.txt
```

**Output:**
```plain-text
#
File
Created
Updated
Secure:
Author
Function
```

Let's print the third column of myfile.txt.

```bash
awk '{print $3}' myfile.txt
```

**Output:**
```plain-text
myfile.txt
August
August

Santhos
UtilityTest
```

Now you could have an idea on the "awk" command and its text processing function. It goes through all lines one by one and treats spaces as a default delimiter to split a line of text and find the word which is placed in the specified number in the command. For an example, the tool splits the line and find the word in third occurrence in the last command execution.

Can we count the number of lines that starts with "#" in the myfile.txt?

```bash
awk '/#/{count++}END{print count}' myfile.txt
```

**Output:**
```plain-text
1
```

Above output shows that the myfile.txt only contains a commented line that's "# myfile.txt".

Let's filter the "Author Name" and "Function Name"…

```bash
awk -F: '/Author Name|Function name/{print $2}' myfile.txt
```

**Output:**
```plain-text
Santhos Sunthar
GrepTest
```

We can format it in a good way!

```bash
awk -F': ' '/Author Name|Function name/ {printf "%s: %s\n", $1, $2}' myfile.txt
```

**Output:**
```plain-text
Author Name: Santhos Sunthar
Function name: GrepTest
```

Let's extract the timeline information of myfile.txt…

```bash
awk -F': ' '/Created At|Updated At/{print $2}' myfile.txt
```

**Output:**
```plain-text
August 5, 2024
August 9, 2024
```

Let's check whether the myfile.txt is secure or not…

```bash
awk -F: '/Secure/{if($2~/True/) print "myfile.txt is secure"; else print "myfile.txt is not secure"}' myfile.txt
```

**Output:**
```plain-text
myfile.txt is secure
```

You learnt these commands now to explore text processing in Linux!

Let's explore the benefits of pipelining these commands…

I'm gonna extract timeline information to modify it. So, let's change the month "August" to "July".

```bash
grep 'At:' myfile.txt | sed 's/August 9/August 10/' | awk -F': ' '{print $2}'
```

**Output:**
```plain-text
August 5, 2024
August 10, 2024
```

Let's format the output data nicely using "awk" and "sed".

```bash
awk -F': ' '/File Name|Author Name|Secure/ {print $1 ": " $2}' myfile.txt | sed 's/^/-> /'
```

**Output:**
```plain-text
-> File Name: myfile.txt
-> Secure: True
-> Author Name: Santhos Sunthar
```

By combining "grep", "sed" and "awk", you can create powerful and flexible scripts to handle complex text processing tasks in Linux.

## Conclusion

I hope you liked this article, and mastering in "grep", "sed" and "awk" can significantly enhance your ability to process and analyze text data in Linux systems. Therefore, why are you waiting to make your hands dirty? Let's practice these amazing utilities in your favorite Linux distro! 🙂