require 'rubygems'
require 'ftools'


task :default => :test

task :test do |t|
  test_files = FileList['test/*test*.html']
  test_files.each{|file| `open #{file}`}
end

task :deploy do |t|
  
end