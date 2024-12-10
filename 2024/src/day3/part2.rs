use std::fs;
use regex::Regex;

pub fn run_example() {
  println!("executing example PART 2");
  match fs::read_to_string("./src/day3/example_input_part2.txt") {
    Ok(input) => { 
			let result = run(input);
			println!("result should be 48 -> {} | {}", result, result == 48)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  }
}

pub fn run_complete() {
  println!("executing complete PART 1");
  match fs::read_to_string("./src/day3/input_part2.txt") {
		Ok(example_input_part1) => { 
			let result = run(example_input_part1);
			println!("result is [{}]", result); // 174103751
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

fn run(input: String) -> i32 {
  todo!()
}