#!/bin/bash

# Detect language from filename
file=$(ls *.py 2>/dev/null || ls *.cpp 2>/dev/null || ls *.java 2>/dev/null || ls *.js 2>/dev/null)

if [[ $file == *.py ]]; then
    echo "Running Python file: $file"
    python3 "$file"

elif [[ $file == *.cpp ]]; then
    echo "Compiling and running C++ file: $file"
    g++ "$file" -o output && ./output

elif [[ $file == *.java ]]; then
    echo "Compiling and running Java file: $file"
    javac "$file"
    classname=$(basename "$file" .java)
    java "$classname"

elif [[ $file == *.js ]]; then
    echo "Running JavaScript file: $file"
    node "$file"

else
    echo "Unsupported file format or no file found."
fi