use std::fs;
use regex::Regex;

// mul\(\d+,\d+\)

pub fn run_example() {
  println!("executing example PART 1");
  match fs::read_to_string("./src/day3/example_input.txt") {
    Ok(input) => { 
			let result = execute_part1(input);
			println!("result should be 161 -> {} | {}", result, result == 161)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  }
}

pub fn run_complete() {
  println!("executing complete PART 1");
  match fs::read_to_string("./src/day3/input.txt") {
		Ok(example_input_part1) => { 
			let result = execute_part1(example_input_part1);
			println!("result is [{}]", result); // 174103751
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

fn execute_part1(input: String) -> i32 {
  let multiplier_regex = Regex::new(r"mul\(\d+,\d+\)").unwrap();
  let number_regex = Regex::new(r"\d+").unwrap();
  let mut multiplications = vec![];
      
  for multiplier_capture in multiplier_regex.find_iter(input.as_str()) {
    let mut to_multiply = vec![];

    for number_capture in number_regex.find_iter(multiplier_capture.as_str()) {
      to_multiply.push(
        number_capture
          .as_str()
          .parse::<i32>()
          .map_or(0, |num|num)
      );
    }

    multiplications.push(to_multiply.iter().product());
  }

  multiplications.iter().sum()
}