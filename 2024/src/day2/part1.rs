use std::fs;

use super::parse_input::parse_problem_input;

pub fn run_example() {
  println!("executing example PART 1");
  let read_example_input = fs::read_to_string("./src/day2/example_input.txt");
  match read_example_input {
		Ok(example_input_part1) => { 
			let result = execute_part1(example_input_part1);
			println!("result should be 2 -> {} | {}", result, result == 2)
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
			let result = execute_part1(example_input_part1);
			println!("result is [{}]", result) // 224
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

fn execute_part1(input: String) -> i32 {
  parse_problem_input(input)
    .iter()
    .filter(|level| is_report_safe(level))
    .count() as i32
}

pub fn is_report_safe(levels: &Vec<i32>) -> bool {
  let is_safe= 
  (is_increasing(levels.clone()) 
  || is_decreasing(levels.clone()))
  && has_correct_distance(levels.clone());
  is_safe
}

fn is_increasing(levels: Vec<i32>) -> bool {
  levels.windows(2).all(|window| window[0] < window[1])
}

fn is_decreasing(levels: Vec<i32>) -> bool {
  levels.windows(2).all(|window| window[0] > window[1])
}

fn has_correct_distance(levels: Vec<i32>) -> bool {
  levels.windows(2).all(|window| {
    let difference = (window[0]-window[1]).abs();
    1 <= difference && difference <= 3
  })
}