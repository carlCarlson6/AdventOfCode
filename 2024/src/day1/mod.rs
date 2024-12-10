pub mod parse_input;
pub mod par1;
pub mod part2;

pub fn run() {
	println!("day 1");
	par1::run_example();
	par1::run_complete();
	part2::run_example();
	part2::run_complete();
}

