import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { voteModel, voteResultModel } from '../../models/voteModel';
/*
  Generated class for the VoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VoteProvider {
  votacionRef: AngularFireList<string>;
  private votesRef: AngularFireList<voteModel>;
  public votes: Observable<voteModel[]>;

  constructor(private db: AngularFireDatabase) {
    this.votesRef = this.db.list<voteModel>('votacion');
    this.votes = this.votesRef.valueChanges();
  }

  public votePlantas(name: string) {
    const vote: voteModel = {
      displayName: name,
      vote: 'plantas'
    }
    this.votesRef.push(vote);
  }

  public voteMatefuegos(name: string) {
    const vote: voteModel = {
      displayName: name,
      vote: 'matafuegos'
    }
    this.votesRef.push(vote);
  }

  public getResults() {
    // let vote: voteResultModel[] = [];
    return this.votes.map(
      project => {
        let plantas = new voteResultModel();
        let matafuegos = new voteResultModel();
        plantas.area = project.filter(values => values.vote === 'plantas').length;
        plantas.vote = 'plantas';
        matafuegos.area = project.filter(values => values.vote === 'matafuegos').length;
        matafuegos.vote = 'matafuegos';
        let results: voteResultModel[] = [];
        results = [
          plantas,
          matafuegos
        ]
        console.log(results);
        return results;
      }
    )
    // .subscribe(
    //   next => {
    //     vote = next; 
    //   },
    //   error => console.error(error),
    //   () => { });
      // console.log(vote);
    // return vote;
  }
}
