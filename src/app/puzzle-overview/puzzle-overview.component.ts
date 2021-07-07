import { Component, OnInit,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puzzle-overview',
  templateUrl: './puzzle-overview.component.html',
  styleUrls: ['./puzzle-overview.component.css']
})
export class PuzzleOverviewComponent implements OnInit {

  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.test();
  }
  test() {
    let puzzle1 = document.getElementById("puzzle1");
    let puzzle2 = document.getElementById("puzzle2");
    if(!puzzle1 || !puzzle2) return;
    this.renderer.listen(puzzle1, 'click', () => { this.router.navigate(['/puzzle1']) });
    this.renderer.listen(puzzle2, 'click', () => { this.router.navigate(['/puzzle2']) });    
    
  }
}
