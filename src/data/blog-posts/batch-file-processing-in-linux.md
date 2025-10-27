---
id: "batch-file-processing-in-linux"
title: "Batch File Processing in Linux"
date: "2024-01-24"
category: "Linux"
tags: ["Linux", "Command Line", "Automation", "File Management"]
readTime: "5 min read"
author: "Santhos Suntharalingam"
featured: true
excerpt: "Learn how to efficiently process files in batches using Linux command-line tools like find and xargs for automation and file management tasks."
---

# Batch File Processing in Linux

We are going to see how batch file processing makes your life easier with any Unix like operating systems including Linux when it comes to deal with files and directories.

So, Let's get started…

## Find Utility

"find" is used to search any files or directories in your Linux machine. Let's see how we can do that effectively for our own needs!

Your questions would be like these…

- How can I find a file using its name?
- How can I find a directory using its name?
- How can I find a file using its extension?
- How can I find a file using its size?

Therefore, we can use "find" command to solve those questions!

First of all, we should know the common syntax of the "find" command.

```bash
root@host:~$ find [path] [expression1] [expression2] [expression3]
```

Now, we can use the above command pattern to fulfill our batch file processing needs!

### Finding a File using Its Name

To find a file using its name, we should know the specific filename and the path that file exists.

```bash
root@host:~$ find /etc -name "passwd"
```

The above command finds all files with the name "passwd".

What will happen if we do not provide "path" parameter in "find" command? It will automatically set the current working directory as the path and It will try to find the file from the current working directory file index.

The above command only looks files without the concern of extensions. It will not find "passwd.txt" file. If we want to include extensions in our search then we have to use the following command…

```bash
root@host:~$ find /etc -name "passwd*"
```

The "passwd*" pattern matches files whose names begin with "passwd" including extension.

### Finding a Directory using Its Name

To find a directory using its name, we should know the directory name and the specific path that the directory exists. Also, we should provide a parameter called "type" as "d".

```bash
root@host:~$ find /var -name "www" -type d
```

The above command finds the specified "www" directory within "/usr" directory path.

### Finding a File using Its Extension

To find a file using its extension, we should provide the following command.

```bash
root@host:~$ find /var/www -name "*.html"
```

The above command finds all the "html" files within "/var/www" directory path. "*" is a placeholder that represents all the filenames.

### Finding a File using Its Size

To find a file using its size, we should provide another parameter called "size".

```bash
root@host:~$ find /var/www -name "*.png" -size +1M
```

The above command finds all "png" files within the specified directory path whose size is greater than "1 Megabyte (1M)".

## Use Case of Find Utility

Think that you are currently working on a directory that contains lot of "txt" files. Now, you should need to convert all of the "txt" files into "json" files. How can you solve this problem without changing each file manually by editing each file's extension from ".txt" to ".json"?

Now, we can use "find" command to solve this problem by automating all the tasks using a "Bash" script.

```bash
#!/bin/bash

for i in `find -name "*.txt"`; do
  "$i" > "${i%.*}.json";
done
```

The above script contains a "for" loop that iterates over each file name and new file will be created with ".json" extension in each iteration.

## Xargs Utility

"xargs" is used to execute multiple commands by passing arguments from the input stream.

For an example, if we want to pass 100 arguments to the "touch" command to create 100 ".txt" files then "xargs" command will help us.

Let's see this scenario…

We have a file named as "backup.txt" and that file contains following data.

```plain-text
2024-01_backup-01
2024-01_backup-02
2024-01_backup-03
2024-01_backup-04
2024-01_backup-05
...
...
...
2024-01_backup-100
```

The task is…

We have to create "txt" files that should be named in "2024–01_backup-[number]" pattern. Shall we do it manually by using touch command by specifying each filename like this?

```bash
root@host:~$ touch 2024-01_backup-01 2024-01_backup-02 2024-01_backup-03 ... 2024-01_backup-100
```

Boring!

Then how we can solve this problem efficiently? "xargs" comes into play in these kind of scenarios!

Let's see how we can do this by using "xargs" command…

```bash
root@host:~$ cat backup.txt | xargs touch
```

The above simple command creates 100 "txt" files named as its own from the "backup.txt" file data as inputs.

To view the newly created files, use "ls" command.

```bash
root@host:~$ ls
2024-01_backup-01 2024-01_backup-02 2024-01_backup-03 2024-01_backup-04
2024-01_backup-05 2024-01_backup-06 ... 2024-01_backup-99 2024-01_backup-100
```

Where is ".txt" extension of all of the newly created files? To add an extension, we should customize our "xargs" command.

```bash
root@host:~$ cat backup.txt | xargs -i touch {}.txt
```

The above command prints the data of the "backup.txt" file and "xargs" command gets the all printed output and each line will be passed as an argument to the "touch" command through the "{}" placeholder.

If we want to use custom placeholder instead of "{}" then we have to use "-I" instead of "-i" parameter.

```bash
root@host:~$ cat backup.txt | xargs -I arg_name touch arg_name.txt
```

How we can pass number of arguments into a command? For this, we should specify how many arguments should be passed into a command when a single command execution happens by using "-n" parameter.

For an example, we have a "txt" file named as "data.txt" that contains following data.

```plain-text
Food=Rice Fruit=Banana Drink=Milk
```

Now, we can print each pair of data in newline from the above "data.txt" with the help of "xargs" command by passing number of arguments.

```bash
root@host:~$ cat data.txt | xargs -n 1 echo
Food = Rice
Fruit = Banana
Drink = Milk
```

What will happen, if we give 2 arguments…

```bash
root@host:~$ cat data.txt | xargs -n 2 echo
Food=Rice Fruit=Banana
Drink=Milk
```

Like this, we can control the number of arguments before passing into any commands.

## Use Case of Xargs Utility

We have "filenames.txt" file that contains the following data…

```plain-text
passwd
secrets
admin
index
```

Our current working directory listing is…

```bash
root@host:~$ ls
admin.php  filenames.txt  secrets.json
```

Task is…

We have to find files whether files exist or not in the current working directory.

To solve this task, we can use "xargs" command…

```bash
root@host:~$ cat filenames.txt | xargs -I file_name sh -c 'find -name "file_name*"'
./secrets.json
./admin.php
```

The above commands find files from the current directory by using "filenames.txt" data. "sh -c" executes the "find" command for each filename separately.

## Conclusion

That's all about this reading and It's time to end! I hope this article will be helpful to accomplish your batch file processing activities! Thank you for putting your eyesight and five minutes on this article. I'll see you again with my future post! 😊