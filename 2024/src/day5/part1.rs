use std::fs;

pub fn run_example() {
  println!("executing example PART 1");
  match fs::read_to_string("./src/day5/example_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part1(input);
			println!("result should be 143 -> {} | {}", result, result == 143)
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  }
}

pub fn run_complete() {
  println!("executing complete PART 1");
  match fs::read_to_string("./src/day5/complete_input_part1.txt") {
    Ok(input) => { 
			let result = execute_part1(input);
			println!("result is [{}]", result); // 6384
		},
		Err(reading_file_error) => {
			println!("bad ): - {}", reading_file_error.to_string());
			panic!("PANIC");
		}
  } 
}

fn execute_part1(input: String) -> i32 {
  let printing_info = parse_input(input);
  printing_info
    .pages_updates
    .iter()
    .filter(|page_updates| 
      matches_rules(page_updates.to_vec(), printing_info.ordering_rules.clone()))
    .map(|matching_page_update| 
      get_central_value(matching_page_update.to_vec()))
    .sum()
}

pub struct PrintingInfo {
  pub ordering_rules: Vec<(i32,i32)>,
  pub pages_updates: Vec<Vec<i32>>,
}

pub fn parse_input(input: String) -> PrintingInfo {
  input
    .split('\n')
    .fold(PrintingInfo {
      ordering_rules: [].to_vec(),
      pages_updates: [].to_vec()
    }, |printing_info, line| {
      if line.contains('|') {
        let vec_line = line
          .split('|')
          .collect::<Vec<&str>>()
          .into_iter()
          .map(|str_number| str_number
            .parse::<i32>()
            .expect("should be a number"))
          .collect::<Vec<i32>>();
        return PrintingInfo {
          ordering_rules: [printing_info.ordering_rules, [(vec_line[0], vec_line[1])].to_vec()].concat(),
          pages_updates: printing_info.pages_updates,
        };
      }
      if line.contains(',') {
        let new_updates = line
          .split(',')
          .collect::<Vec<&str>>()
          .into_iter()
          .map(|str_number| str_number
            .parse::<i32>()
            .expect("should be a number"))
          .collect::<Vec<i32>>();
        let mut new_pages_updates = printing_info.pages_updates.clone();
        new_pages_updates.push(new_updates);
        return PrintingInfo {
          ordering_rules: printing_info.ordering_rules,
          pages_updates: new_pages_updates
        };
      }
      return printing_info
    })
}

pub fn matches_rules(page_updates: Vec<i32>, ordering_rules: Vec<(i32,i32)>) -> bool {
  ordering_rules 
    .into_iter()
    .filter(|ordering_rule|
      page_updates.contains(&ordering_rule.0) & page_updates.contains(&ordering_rule.1)
    )
    .all(|ordering_rule| {
      let matches_rule = {
        let left_index = page_updates
          .iter()
          .position(|page_update| *page_update == ordering_rule.0);
        let right_index = page_updates
          .iter()
          .position(|page_update| *page_update == ordering_rule.1);
        left_index < right_index
      };
      matches_rule
    })
}

pub fn get_central_value(matching_page_update: Vec<i32>) -> i32 {
  matching_page_update[matching_page_update.len() / 2]
}