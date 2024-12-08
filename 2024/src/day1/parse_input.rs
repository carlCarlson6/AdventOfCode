use regex::Regex;

pub struct ProblemInput {
  pub left_numbers: Vec<i32>,
  pub right_numbers: Vec<i32>,
}

pub fn parse_problem_input(input: String) -> ProblemInput {
	let split_by_line = input.trim().split("\n").collect::<Vec<&str>>();
	let mut left_numbers =  vec![];
	let mut right_numbers = vec![];

	let whitespace_regex = Regex::new(r"\s+").unwrap();

	for line in split_by_line {
		let without_extra_whitespace = whitespace_regex.replace_all(line.trim(), "|");
		let str_number_split_by_white_space = without_extra_whitespace.split("|").collect::<Vec<&str>>();
	
		left_numbers
			.push(str_number_split_by_white_space[0]
				.parse::<i32>()
				.expect("parsing error"));
		right_numbers
			.push(str_number_split_by_white_space[1]
				.parse::<i32>()
				.expect("parsing error"));
	}

  ProblemInput {
    left_numbers,
    right_numbers
  }
}