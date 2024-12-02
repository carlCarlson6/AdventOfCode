use std::env;
mod day1;
use crate::day1::main::run_day1;

fn main() {
    let args: Vec<String> = env::args().collect();
    let day_number = args[2].as_str();
    match day_number {
        "1" => run_day1(),
        _ => println!("not worked on this day")
    }
}
