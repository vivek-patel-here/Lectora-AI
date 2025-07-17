#!/bin/bash
set -e
javac Main.java
java -Xmx128m -Xms64m Main
