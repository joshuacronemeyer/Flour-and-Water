require 'rubygems'
require 'ftools'
require 'rake/clean'
require 'rubygems/package_task'

CLEAN.include('tmp', 'pkg')

task :default => :test

desc "big money no whammies!"
task :test do |t|
  test_files = FileList['test/*test*.html']
  test_files.each{|file| `open #{file}`}
end

desc "to the batcave!"
task :deploy do |t|
  command_list = ["git checkout master", "git pull origin master", "mkdir tmp",
    "cp -r public/ tmp", "git checkout gh-pages", "git pull origin gh-pages",
    lambda{ FileList["**/*"].exclude("tmp").collect {|file| "rm -rf #{file}"}},
    "cp -r tmp/* .", "rm -rf tmp", "git add .", "git ci -m 'deploy latest changes'", 
    "git push origin gh-pages", "git checkout master"]
  expanded_command_list = command_list.collect do |command|
    command.is_a?(Proc) ? command.call : command
  end
  system expanded_command_list.flatten.join(" && ")
end

desc "to the google cave!"
task :chrome_package => [:clean, :package]

Rake::PackageTask.new("Hydration", "1.1") do |p|
  p.need_zip = true
  p.package_files.include("public/**/*")
  p.package_files.include("manifest.json")
end
