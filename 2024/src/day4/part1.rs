use std::fs;
use strum::IntoEnumIterator;

use super::types::{Directions, Letter};

pub fn run_example() {
  println!("executing example PART 1");
  match fs::read_to_string("./src/day4/example_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part1(input);
			println!("result should be 18 -> {} | {}", result, result == 18)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  }
}

pub fn run_complete() {
  println!("executing complete PART 1");
  match fs::read_to_string("./src/day4/complete_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part1(input);
			println!("result is [{}]", result); // 2547
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  } 
}

fn execute_part1(input: String) -> i32 {
  // performance can be improved using a matrix
  let letters = read_letters(input);
  letters
    .iter()
    .fold(0, |total, current_letter| 
      total + process_letter(
        current_letter, 
        &letters, 
      )
    )
}

pub fn read_letters(input: String) -> Vec<Letter> {
  let binding = input
    .split("\n")
    .collect::<Vec<&str>>();
  let lines = binding
    .iter()
    .enumerate();
  let mut letters = vec![];

  for (j, line) in lines {
    for (i, charact) in line.chars().into_iter().enumerate() {
      letters.push(Letter {
        position: (
          i.try_into().unwrap(),
          j.try_into().unwrap()
        ),
        value: charact
      });
    }
  }

  letters
}

fn process_letter(
  current_letter: &Letter, 
  letters: &Vec<Letter>
) -> i32 {
  if current_letter.value != 'X' {
    return 0;
  }

  Directions::iter()
    .fold(0, |total, direction| {
      let m_letter = letters
        .iter()
        .find(|letter| direction.move_in_direction(current_letter.position, 1) == letter.position)
        .is_some_and(|letter| letter.value == 'M');
      let a_letter = letters
        .iter()
        .find(|letter| direction.move_in_direction(current_letter.position, 2) == letter.position)
        .is_some_and(|letter| letter.value == 'A');
      let s_letter = letters
        .iter()
        .find(|letter| direction.move_in_direction(current_letter.position, 3) == letter.position)
        .is_some_and(|letter| letter.value == 'S');

      let is_match = m_letter & a_letter & s_letter;
      if is_match {
        total +1
      } else {
        total
      }
    })
}