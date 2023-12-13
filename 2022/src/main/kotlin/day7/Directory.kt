package day7

class Directory(
    val name: String,
    val files: List<File>,
    val childrenDirectories: List<String>
) {
    val size: Int get() = files.sumOf { it.size }
}