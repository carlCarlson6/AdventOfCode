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

fn execute_part1(input: String) -> i32 {
  let printing_info = parse_input(input);

  let asd = printing_info.ordering_rules
    .into_iter()
    .group_by(|rule| rule.);

  printing_info
    .pages_updates
    .iter()
    .filter(|page_updates| 
      matches_rules(page_updates.to_vec(), printing_info.ordering_rules.clone()))
    .map(|matching_page_update| 
      get_central_value(matching_page_update.to_vec()))
    .sum()
}

struct PrintingInfo {
  ordering_rules: Vec<(i32,i32)>,
  pages_updates: Vec<Vec<i32>>,
}

fn parse_input(input: String) -> PrintingInfo {
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

fn matches_rules(page_updates: Vec<i32>, ordering_rules: Vec<(i32,i32)>) -> bool {
  ordering_rules 
    .into_iter()
    .all(|ordering_rule| {
      false
    })

  /*page_updates
    .into_iter()
    .all(|page_update| {
        let mut rules_to_apply = ordering_rules
        .iter()
        .filter(|rule| rule.0 == page_update);
      rules_to_apply.all(|rule_to_apply| {
        let left_index = {
          

          0
        };
        let right_index = 1;
        left_index < right_index
      })  
    })*/
}

// &[i32]
fn get_central_value(matching_page_update: Vec<i32>) -> i32 {
  matching_page_update[matching_page_update.len().div_ceil(2)]
}