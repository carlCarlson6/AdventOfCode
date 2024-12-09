type Reports = Vec<Vec<i32>>;

pub fn parse_problem_input(input: String) -> Reports {
  let mut reports = vec![];  
  for report_line in input.split("\n") {
    let mut levels = vec![];
    for str_level in report_line.split(" ") {
        levels.push(str_level.parse::<i32>().expect("error parsing"));
    }
    reports.push(levels);
  }
  reports
}