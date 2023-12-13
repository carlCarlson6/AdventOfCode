package day7

import readTestDayData

fun main() {
    executeTest()
    executeChallenge()
}

fun executeTest() {
    println("with test data")
    val fileSystem = parseFileSystem(readTestDayData(7))
    val sizes = fileSystem
        .findDirectories { fileSystem.isSizeAtMost1000000(it.name) }
        .sumOf { fileSystem.calculateDirectorySize(it.name) }
    println("-------------------------------")
}

fun executeChallenge() {
    println("with real data")
    println("-------------------------------")
}