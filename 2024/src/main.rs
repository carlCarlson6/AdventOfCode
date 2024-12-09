use std::env;

use day1::run_day1;
mod day1;

use day2::run_day2;
mod day2;

fn main() {
	let args: Vec<String> = env::args().collect();
	let day_number = args[2].as_str();
	match day_number {
		"1" => run_day1(),
		"2" => run_day2(),
		_ => println!("not worked on this day")
	}
}
