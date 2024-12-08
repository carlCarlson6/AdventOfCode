use std::{fs, vec};

use super::parse_input;

pub fn execute_example_part2() {
  println!("executing example PART2");
  let read_example_input = fs::read_to_string("./src/day1/example_input_part_1.txt");
  match read_example_input {
		Ok(example_input_part1) => { 
			let result = execute_part2(example_input_part1);
			println!("result should be 31 -> {} | {}", result, result == 31)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

pub fn execute_complete_part2() {
  println!("executing complete PART2");
	let read_complete_input_part1 = fs::read_to_string("./src/day1/input_part_1.txt");
	match read_complete_input_part1 {
		Ok(complete_input_part1) => { 
			let result = execute_part2(complete_input_part1);
			println!("result part 1 is = [{}]", result) // correct result => 1506483
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

fn execute_part2(input: String) -> i32 {
  let problem_input = parse_input::parse_problem_input(input);
  
  let mut mults = vec![];

  for left_number in problem_input.left_numbers {
    let count = problem_input.right_numbers
    .iter()
    .filter(|&&x| x == left_number)
    .copied()
    .collect::<Vec<i32>>()
    .len() as i32;
    mults.push(left_number*count);
  }
  
  mults.iter().sum()
}