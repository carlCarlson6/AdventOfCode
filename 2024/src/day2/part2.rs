use std::fs;

use super::{parse_input::parse_problem_input, part1::is_report_safe};

pub fn run_example() {
  println!("executing example PART 2");
  let read_example_input = fs::read_to_string("./src/day2/example_input.txt");
  match read_example_input {
		Ok(example_input_part1) => { 
			let result = execute_part2(example_input_part1);
			println!("result should be 4 -> {} | {}", result, result == 4)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

pub fn run_complete() {
  println!("executing complete PART 2");
  let read_input = fs::read_to_string("./src/day2/input.txt");
  match read_input {
		Ok(example_input_part1) => { 
			let result = execute_part2(example_input_part1);
      println!("result is [{}]", result);
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

fn execute_part2(input: String) -> i32 {
  parse_problem_input(input)
    .iter()
    .filter(|level| is_report_tolerable(level.to_vec()))
    .count() as i32
}

fn is_report_tolerable(levels: Vec<i32>) -> bool {
	if is_report_safe(levels) {
		true
	} else {
		false
	}
}