import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { checkNoChangesNode } from '@angular/core/src/view/view';
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

  public getResults(): voteResultModel {
    let vote: voteResultModel = new voteResultModel();
    this.votes.subscribe(
      next => {
        vote.total = next.length
        vote.plantas = next.filter(values => values.vote === 'plantas').length;
        vote.matafuegos = next.filter(values => values.vote === 'matafuegos').length;
      },
      error => console.error(error),
      () => { });
    return vote;
  }
}
