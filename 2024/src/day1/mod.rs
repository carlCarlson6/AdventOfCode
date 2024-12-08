use par1::{execute_complete_part1, execute_example_part1};
use part2::{execute_complete_part2, execute_example_part2};

pub mod parse_input;
pub mod par1;
pub mod part2;

pub fn run_day1() {
	println!("day 1");
	execute_example_part1();
	execute_complete_part1();
	execute_example_part2();
	execute_complete_part2();
}

