use std::fs;

use super::part1::{self, get_central_value, PrintingInfo};

pub fn run_example() {
  println!("executing example PART 2");
  match fs::read_to_string("./src/day5/example_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part2(input);
			println!("result should be 123 -> {} | {}", result, result == 123)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  }
}

pub fn run_complete() {
  println!("executing complete PART 2");
  match fs::read_to_string("./src/day5/complete_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part2(input);
			println!("result is [{}]", result); //
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  } 
}

fn execute_part2(input: String) -> i32 {
  let PrintingInfo { pages_updates, ordering_rules } = part1::parse_input(input);
  pages_updates
    .iter()
    .filter(|page_updates| 
      !part1::matches_rules(
        page_updates.to_vec(), 
        ordering_rules.clone()))
    .map(|page_updates| 
      get_central_value(
        apply_ordering_rules(
          page_updates.to_vec(), 
          ordering_rules.clone())))
    .sum()
}

fn apply_ordering_rules(page_updates: Vec<i32>, ordering_rules: Vec<(i32,i32)>) -> Vec<i32> {
  todo!()
}