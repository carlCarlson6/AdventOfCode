use std::fs;

use super::parse_input;

pub fn execute_example_part1() {
	println!("executing example PART1");
	let read_example_input_part1 = fs::read_to_string("./src/day1/example_input_part_1.txt");
	match read_example_input_part1 {
		Ok(example_input_part1) => { 
			let result = execute_part1(example_input_part1);
			println!("result should be 11 -> {} | {}", result, result == 11)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

pub fn execute_complete_part1() {
	println!("executing complete PART1");
	let read_complete_input_part1 = fs::read_to_string("./src/day1/input_part_1.txt");
	match read_complete_input_part1 {
		Ok(complete_input_part1) => { 
			let result = execute_part1(complete_input_part1);
			println!("result part 1 is = [{}]", result) // correct result => 1506483
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

fn execute_part1(input: String) -> i32 {
	let problem_input = parse_input::parse_problem_input(input);

	let mut left_numbers = problem_input.left_numbers.clone();
	left_numbers.sort();

	let mut right_numbers = problem_input.right_numbers.clone();
	right_numbers.sort();

	let mut absolute_differences = vec![];
	for idx in 0..left_numbers.len() {
		let left_number = left_numbers[idx];
		let right_number = right_numbers[idx];
		absolute_differences.push((left_number-right_number).abs());
	}

	absolute_differences.iter().sum()
}