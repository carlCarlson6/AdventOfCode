use std::{char, fs};

use super::part1::read_letters;
use super::types::{Letter, Directions};

pub fn run_example() {
  println!("executing example PART 2");
  match fs::read_to_string("./src/day4/example_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part2(input);
			println!("result should be 9 -> {} | {}", result, result == 9)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  }
}

pub fn run_complete() {
  println!("executing complete PART 2");
  match fs::read_to_string("./src/day4/complete_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part2(input);
			println!("result is [{}]", result); // 1939
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  } 
}

fn execute_part2(input: String) -> i32 {
  let letters = read_letters(input);
  letters
  .iter()
  .fold(
    0, 
    |total, current_letter| total + process_letter(current_letter, &letters)
  )
}

fn process_letter(
  current_letter: &Letter,
  letters: &Vec<Letter>
) -> i32 {
  if current_letter.value != 'A' {
    return 0;
  }

  let up_cross = {

    let upper_m_letter = is_adjacent_letter_match(&Directions::UpLeft, current_letter.position, 'M', letters);
    let down_s_letter = is_adjacent_letter_match(&Directions::DownRight, current_letter.position, 'S', letters);
    let upper_s_letter = letters
      .iter()
      .find(|letter| 
        Directions::UpLeft.move_in_direction(current_letter.position, 1) == letter.position)
      .is_some_and(|letter| letter.value == 'S');
    let down_m_letter = letters
      .iter()
      .find(|letter| 
        Directions::DownRight.move_in_direction(current_letter.position, 1) == letter.position)
      .is_some_and(|letter| letter.value == 'M');
  
    (upper_m_letter & down_s_letter) || (upper_s_letter & down_m_letter)
  };

  let down_cross = {
    let upper_m_letter = letters
      .iter()
      .find(|letter| 
        Directions::DownLeft.move_in_direction(current_letter.position, 1) == letter.position)
      .is_some_and(|letter| letter.value == 'M');
    let down_s_letter = letters
      .iter()
      .find(|letter| 
        Directions::UpRight.move_in_direction(current_letter.position, 1) == letter.position)
      .is_some_and(|letter| letter.value == 'S');
    let upper_s_letter = letters
      .iter()
      .find(|letter| 
        Directions::DownLeft.move_in_direction(current_letter.position, 1) == letter.position)
      .is_some_and(|letter| letter.value == 'S');
    let down_m_letter = letters
      .iter()
      .find(|letter| 
        Directions::UpRight.move_in_direction(current_letter.position, 1) == letter.position)
      .is_some_and(|letter| letter.value == 'M');

    (upper_m_letter & down_s_letter) || (upper_s_letter & down_m_letter)
  };
    
  match up_cross & down_cross {
    true => 1,
    false => 0
  }
}

fn is_adjacent_letter_match(direction: &Directions, position: (i32, i32), charact: char, letters: &Vec<Letter>) -> bool {
  letters
    .iter()
    .find(|letter| 
      direction.move_in_direction(position, 1) == letter.position)
    .is_some_and(|letter| letter.value == charact)
}