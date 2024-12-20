use std::fs;
use regex::Regex;

use super::part1;

 // do\(\)|don't\(\)|mul\(\d+,\d+\)

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
  println!("executing complete PART 2");
  match fs::read_to_string("./src/day3/input_part2.txt") {
		Ok(example_input_part1) => { 
			let result = run(example_input_part1);
			println!("result is [{}]", result); // 100411201
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
	}
}

struct MemoryStatus {
  should_operate: bool,
  results: Vec<i32>
}

fn run(input: String) -> i32 {
  let instructions_regex = Regex::new(r"do\(\)|don't\(\)|mul\(\d+,\d+\)").unwrap();
  let mut memory_status = MemoryStatus {
    should_operate: true,
    results: vec![]
  };

  for instruction_match in instructions_regex.find_iter(input.as_str()) {
    memory_status = apply_intruction(instruction_match.as_str(), memory_status)
  }

  memory_status.results.iter().sum()
}

fn apply_intruction(instruction: &str, current_status: MemoryStatus) -> MemoryStatus {
  let do_intruction_regex = Regex::new(r"do\(\)").unwrap();
  let dont_instruction_regex = Regex::new(r"don't\(\)").unwrap();
  let mult_instruction_regex = Regex::new(r"mul\(\d+,\d+\)").unwrap();

  let select_operation = [
    do_intruction_regex.is_match(instruction),
    dont_instruction_regex.is_match(instruction),
    mult_instruction_regex.is_match(instruction)
  ];
  match select_operation {
    [true, _, _] => apply_do_instruction(current_status),
    [_, true, _] => apply_dont_instruction(current_status),
    [_, _, true] => apply_mult_instruction(instruction, current_status),
    _ => current_status
  }
}

fn apply_do_instruction(current_status: MemoryStatus) -> MemoryStatus {
  MemoryStatus {
    should_operate: true,
    results: current_status.results
  }
}

fn apply_dont_instruction(current_status: MemoryStatus) -> MemoryStatus {
  MemoryStatus {
    should_operate: false,
    results: current_status.results
  }
}

fn apply_mult_instruction(instruction: &str, current_status: MemoryStatus) -> MemoryStatus {
  let to_append = if current_status.should_operate {
    part1::apply_mult_instruction(instruction)
  } else {
    0
  };

  MemoryStatus {
    should_operate: current_status.should_operate,
    results: [current_status.results.as_slice(), &[to_append]].concat()
  }
}

