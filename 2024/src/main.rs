use std::env;

mod day1;
mod day2;
mod day3;
mod day4;

fn main() {
	let args: Vec<String> = env::args().collect();
	let day_number = args[2].as_str();
	match day_number {
		"1" => day1::run(),
		"2" => day2::run(),
		"3" => day3::run(),
		"4" => day4::run(),
		_ => println!("not worked on this day")
	}
}
